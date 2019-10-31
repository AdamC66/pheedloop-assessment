# __PheedLoop Assessment DRAFT 1__

## Backend
I've created the models 'sessions' and 'speakers' as per the instructions, I did add a 'num_of_ratings' field to the sessions model, I'll get into that later. For now/ for testing I left speaker photos as a url field as they are easy to quickly include

Backend uses Django Rest Framework to communicate with the front-end.  serializers for sessions and speakers were written, the session serializer also returns the speakers associated with each/ the specified session. as, for the time being everywhere I am using the session data I am also using the speakers

The api.py file (effectively the views.py file) contains 2 endpoints, the speaker endpoint is currently not utilized by the frontend, but I thought it would be good to include in case I needed it down the line.

the session endpoint can return all sessions if the endpoint is /api/sessions, or a specific one by including the session id (eg /api/sessions/1), I would like to change the id to a slug of the session title, but this is draft 1, and id works for now.

The session endpoint also handles the put request from the front end to update the rating when one is left.
when the request is made from the front end, it includes the session id and the rating that was left. this is where the number of ratings comes in, we multiply the current rating by the number of ratings (num_of_ratings!) then add the new one, and divide by num_of_ratings +1 to properly get the average rating. this method also calls my send_sms file/ send_message function which uses the twilio api, and information from the session that was updated (rating) to send an sms to each speaker for that session

Right now, the only way to add sessions/speakers is through the django admin panel, which was specified as fine in the instructions.

## Frontend

I kept it super basic, honestly have not spend much time at all on styling/ layout, I'll circle back to it later. but the frontend uses react-bootstrap for components/styling. there's really nowhere to go in the front end either than the list of all sessions, and a page for a specific session (where you can leave a rating).
I've written all the components as functional components using hooks where I need state, I have found this to be pretty tricky where requests are required due to Javascript being asychronous but I think everything works as expected, at least I havent encountered any bugs... yet.

I also used react-star-rating-component to visually display the rating, after implementing it, I realized it wouldnt show partially filled stars, but realized that was something I could circle back to. I added a text/number rating on the individual session page, as well as included the number of ratings.


##Next Steps
the first next step is authentication, I'm thinking I'll try JWT auth, but if I cant get that to work I've done token auth through DRF before and that shouldnt be a problem. then creating a dashboard to add/edit/remove sessions and speakers. then the google sheets integration. I would also like to write tests for the backend


# Day 2
## Auth

Here we have a question, what is a user? is a speaker a user? If so what will a speaker be able to do?
For the purposes of this assessment I'm going to assume a user is an "orginizer" of sorts. This user will be able to create edit and delete sessions, as well as speakers....

In the end, I decided to make it so users are anyone that want to create a session. once registered and logged in, users can create sessions and speakers. When creating a speaker users have a dropdown menu that is populated with all their sessions. they can also add a speaker without including a session, however I still have to add a way to add already existing speakers to already existing sessions.

Also need to add edit/ delete functionality to speakers and sessions.

I ended up using DRF token auth, as I was familiar with it, I'd like to add a way to delete tokens on logout, and create a new one on login.

I'm still not sure the best way to handle authentication in React, in the previous project I used it, we ended up having every page/component check to see if the user was logged in, this ended up making the app rather clunky imo, so this time I decided to try something different.

now, the App component handles all the authentication checking. and simply either passes a "loggedIn" boolean to components where things are conditionally rendered based on if the user is logged in (eg showing "Login/Register" or "Logout" in the header) or, allows private routes in the Router, which is a component from "https://tylermcginnis.com/react-router-protected-routes-authentication/" which works quite well in my opinion. This has the effect that if an unauthenticated user were to navigate to a private route they are automatically redirected to the login page.

## Google Sheets

This was actually pretty easy, now, a user can only leave a rating if they are logged in, and when the user leaves a rating it adds a row to a google sheet with the timestamp, rating, id of the session and the users first and last name. This was accomplished by using the google sheets api (obviously).

## Progress

Overall I am very happy with the progress I made today, as stated above the obvious next step is to add edit/delete functionality for sessions and speaker and add a way to add existing speakers to sessions. this would mean that speakers would need an owner attribute.

Then I think it's just some styling and testing, pretty good for 2 days work.

# Day 3

## Edit/Delete

I added edit/ delete functionality to the back and front end for speakers and sessions. sessions was relatively easy, most of the code was already written, I did add the possibility to add speakers from the session endpoint, but havent implemented anything in the front end to handle that yet. 

The editing speakers was also relatively easy, I did add the owner property to speakers as mentioned in the day 2 update, this ensures users can only edit speakers they have created. I have not locked this out in the frontend however, that is to say a user could navigate to /speakers/2/edit even if they werent the owner of speaker 2, however they could not successfully send a request to the back end to update the speaker.

In the edit speaker page, I added a multiselect for sessions, this allows users to assign speakers to multiple sessions, this just seemed like a good feature that was easy enough to add.

## Validation
I also added validators to the create/edit forms for speakers and sessions. all fields are required on the form,so for each field I simply checked if the form field had a value, and if it doesnt I add an error. for Email and photo urls, I used regular expressions to test, I found those 2 on stack overflow. I also limited the photo url to 200 characters as that is the limit of URLField in Django.


## Email Sending
I also added a backend code to send an email when a speaker has been added to a session. this is pretty basic, and uses my own gmail, so I've left the code commented out, but whenever a speaker is added/updated they will recieve an email alert with the sessions they've been assigned to

## Review

In the interest of adding functionality quickly, I have different pages for the add/edit speaker/session pages, realistically I could have made one page that handles both cases, but in the interest of getting things done quickly I simply copied/renamed them. This had a drawback when it came to adding validators, which I added individually to each page. Also I probably (definitely, it's not DRY at all) could have made a component to handle the validation as well, but agian in the interest of adding/ completing it quickly I copied it to the components/ made it to suit each.

I believe I'm at the point where all the required features are in place per the instructions, there are many features that I can see on a roadmap, but in the interest of trying to get this deployed/running I'm going to skip them for now, but I may as well list some of the things I can think of now.

1. adding an events model (date_start, date_end, location, sessions, etc.)
2. Grouping Sessions in events
3. Associating users with events/ adding tickets to events
4. adding more information to sessions (eg date, time, location, lead photo)
5. adding feedback to individual speakers as opposed to just the session
6. adding comments to session review rather than just the star rating system

Again I should also clean up the styling, I tend to keep things pretty basic during initial development, I think it's clean enough for now, and I really want to work on deployment so I'm going to leave it.

## Deployment   

well I got it deployed to heroku, found a bunch of bugs in the process but I believe I was able to squash most if not all of them. the biggest one was editing my api endpoints (these are not visible in this version so I'll do my best to explain them, I had to make changes to folder structure to get it to deploy to heroku properly), I used a re_path (regular expression path) to point django to Reacts index.html, the path was re_path('.*', template="index.html") however my presentations app urls were included with '' as the path, so I had to add 'presentations/' in the urls, and in the frontend where these endpoints were called. Small mistake, but now that I know that it wont happen again.

the next little hangup was with my speaker add/edit, and there were two big problems with it. First, in the select session dropdown, I was incorrectly grabbing the selected session, and then I was incorrectly sending it to the backend. I fixed this in both versions (this repo, and the deployed version), by assigning the session id as the id of the option in the dropdown, and then sending that. For whatever reason the backend wanted a number, as a string, within a list (eg ['4']). Which did take me a little bit to figure out. the list I assume is due to the many-to-many relationship. but I'm not sure why it didnt like integers and only accepted strings. whatever.

Anyway this project is now deployed to http://pheedloop-assessment.herokuapp.com/ 