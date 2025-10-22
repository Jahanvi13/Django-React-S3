# Django-React-S3 Project

## Description
This project is a web application built with Django, React, and Amazon S3. It allows users to upload files to an S3 bucket and view a list of uploaded files.The backend generates presigned URLs for secure, direct-to-S3 uploads, while the frontend provides a clean drag-and-drop interface for uploading and listing files.


## Installation
1. Clone the repository.
2. Install dependencies.
3. Set up AWS S3 credentials.
4. Run Django server.
5. Run React frontend.

## Usage
1. Upload files using the provided form.
2. View the list of uploaded files.

## API Endpoints
- `/api/upload/`: POST endpoint to upload files to S3.
- `/api/files/`: GET endpoint to fetch a list of uploaded files.
- `/api/files/<key>: DELETE files from S3.

## Credits
- Django
- React
- Amazon S3

