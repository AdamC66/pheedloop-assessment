from django.core.mail import send_mail
from .models import Session

def session_alert(speaker_name,speaker_email, sessions):
    session_names = ""
    for session in sessions:
        session_names += (" " + Session.objects.get(id=session).title)

    message = f'Hi {speaker_name}, welcome! you have been assigned to the following sessions {session_names}'
    
    send_mail(
    'Welcome! You have been assigned to sessions',
    message,
   '',
    [speaker_email],
    fail_silently=True,
)