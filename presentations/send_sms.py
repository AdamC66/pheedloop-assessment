import os
from twilio.rest import Client
import re
'''
    Twilio API key stored in .env file in pheedloop dir, 
    in order to use the twilio api you'll need to create this file with the following lines:
    
    ACCOUNT_SID = "YOUR ACCOUNT SID HERE"
    AUTH_TOKEN = "YOUR AUTH TOKEN HERE"
    FROM_NUMBER = "YOUR TWILIO NUMBER HERE" (INCLUDING THE + sign!)
'''
def send_message(speakers, new_rating, session):
    account_sid = os.getenv('ACCOUNT_SID')
    auth_token = os.getenv('AUTH_TOKEN')
    from_number = os.getenv('FROM_NUMBER')
    client = Client(account_sid, auth_token)
    for speaker in speakers:
        print(f'Hi {speaker.name}, someone left a {new_rating} star review on your session {session.title}, your overall rating is now {round(session.rating, 2)}')
        message = client.messages \
            .create(
                body = f'Hi {speaker.name}, someone left a {new_rating} star review on your session {session.title}, your overall rating is now {round(session.rating, 2)}',
                from_= from_number,
                to=f'+1{re.sub("[^0-9]", "",speaker.phone_number)}'
            )