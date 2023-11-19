from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed
# from app.models import Album, db
from flask_login import current_user

class SongForm(FlaskForm):
    name=StringField(validators=[InputRequired(), Length(max=100)])
    albumId=IntegerField()
    mp3=FileField(validators=[FileAllowed(['mp3']), InputRequired()])
    lyrics=TextAreaField()

class UpdateSongForm(FlaskForm):
    name=StringField(validators=[InputRequired(), Length(max=100)])
    albumId=IntegerField()
    lyrics=TextAreaField()
