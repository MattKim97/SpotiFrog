
import boto3
import botocore
import os
import uuid
from io import BytesIO
from mutagen.mp3 import MP3

# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages

def error_message(key,string):
    errorMessages= {"errors":{key:[string]}}
    return errorMessages


def error_messages(dictionary):
    return {"errors": dictionary}


# def analyzePlayTime(mp3_file):
#     audio = AudioSegment.from_mp3(mp3_file)
#     duration = len(audio) / 1000
#     return duration

def analyzePlayTime(mp3_file):
    audio = MP3(BytesIO(mp3_file))
    duration = int(audio.info.length)
    return duration

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "tiff", "jfif"}

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL, 
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
