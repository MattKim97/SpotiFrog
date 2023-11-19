from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed



class SongForm(FlaskForm):
    name=StringField(validators=[InputRequired(), Length(max=100)])
    albumId=SelectField(choices=[2])
    mp3=FileField(validators=[FileAllowed(['mp3']), InputRequired()])
    # playtimeLength=IntegerField(validators=[InputRequired()])
    lyrics=TextAreaField()
    # playtimeLength: analyze mp3 data
    # albumTrackNumber: 
