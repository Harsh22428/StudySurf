from google.cloud import firestore
from google.api_core.exceptions import GoogleAPIError, NotFound
from fastapi import HTTPException, status
from typing import Dict, Any, Optional
from datetime import datetime
import os
import uuid

class FirestoreClient:
    def __init__(self):
        """Initialize Firestore client."""
        # Authenticate using GOOGLE_APPLICATION_CREDENTIALS env var
        self.db = firestore.Client(project=os.getenv("GCP_PROJECT_ID"))
        self.users_collection = self.db.collection(os.getenv("FIRESTORE_USERS_COLLECTION", "study_surf_users"))

    # ============= USER OPERATIONS =============

    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user document in Firestore."""
        user_id = str(uuid.uuid4())
        timestamp = datetime.utcnow().isoformat()

        item = {
            "userId": user_id,
            "username": user_data["username"],
            "name": user_data["name"],
            "passwordHash": user_data["password_hash"],
            "preferences": {
                "age": user_data["age"],
                "academicLevel": user_data["academic_level"],
                "major": user_data["major"],
                "dyslexiaSupport": user_data.get("dyslexia_support", False),
                "languagePreference": user_data.get("language_preference", "English"),
                "learningStyles": user_data.get("learning_styles", []),
                "metadata": user_data.get("metadata", []),
            },
            "createdAt": timestamp,
            "updatedAt": timestamp,
        }

        try:
            # Ensure username is unique
            existing_user = self.get_user_by_username(user_data["username"])
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User already exists"
                )

            self.users_collection.document(user_id).set(item)
            return item

        except GoogleAPIError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create user: {str(e)}"
            )

    def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """Get user by username using Firestore query."""
        try:
            query = self.users_collection.where("username", "==", username).limit(1)
            results = query.stream()
            for doc in results:
                return doc.to_dict()
            return None
        except GoogleAPIError as e:
            print(f"Error querying user by username: {e}")
            return None

    def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by userId."""
        try:
            doc_ref = self.users_collection.document(user_id)
            doc = doc_ref.get()
            if doc.exists:
                return doc.to_dict()
            return None
        except NotFound:
            return None
        except GoogleAPIError as e:
            print(f"Error getting user by ID: {e}")
            return None

    def update_user_preferences(self, user_id: str, preferences: Dict[str, Any]) -> Dict[str, Any]:
        """Update user preferences (or other fields)."""
        try:
            doc_ref = self.users_collection.document(user_id)
            doc = doc_ref.get()

            if not doc.exists:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )

            update_data = {"updatedAt": datetime.utcnow().isoformat()}

            for key, value in preferences.items():
                if key == "name":
                    update_data["name"] = value
                else:
                    update_data[f"preferences.{key}"] = value

            doc_ref.update(update_data)
            updated_doc = doc_ref.get().to_dict()
            return updated_doc

        except GoogleAPIError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update user: {str(e)}"
            )
