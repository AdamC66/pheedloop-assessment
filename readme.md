# __PheedLoop Assessment DRAFT 1__

##Backend
I've created the models 'sessions' and 'speakers' as per the instructions, I did add a 'num_of_ratings' field to the sessions model, I'll get into that later. For now/ for testing I left speaker photos as a url field as they are easy to quickly include

Backend uses Django Rest Framework to communicate with the front-end.  serializers for sessions and speakers were written, the session serializer also returns the speakers associated with each/ the specified session. as, for the time being everywhere I am using the session data I am also using the speakers

The api.py file (effectively the views.py file) contains 2 endpoints, the speaker endpoint is currently not utilized by the frontend, but I thought it would be good to include in case I needed it down the line.

the session endpoint can return all sessions if the endpoint is /api/sessions, or a specific one by including the session id (eg /api/sessions/1), I would like to change the id to a slug of the session title, but this is draft 1, and id works for now.

The session endpoint also handles the put request from the front end to update the rating when one is left.
when the request is made from the front end, it includes the session id and the rating that was left. this is where the number of ratings comes in, we multiply the current rating by the number of ratings (num_of_ratings!) then add the new one, and divide by num_of_ratings +1 to properly get the average rating. this method also calls my send_sms file/ send_message function which uses the twilio api, and information from the session that was updated (rating) to send an sms to each speaker for that session

Right now, the only way to add sessions/speakers is through the django admin panel, which was specified as fine in the instructions.

##Frontend

I kept it super basic, honestly have not spend much time at all on styling/ layout, I'll circle back to it later. but the frontend uses react-bootstrap for components/styling. there's really nowhere to go in the front end either than the list of all sessions, and a page for a specific session (where you can leave a rating).
I've written all the components as functional components using hooks where I need state, I have found this to be pretty tricky where requests are required due to Javascript being asychronous but I think everything works as expected, at least I havent encountered any bugs... yet.

I also used react-star-rating-component to visually display the rating, after implementing it, I realized it wouldnt show partially filled stars, but realized that was something I could circle back to. I added a text/number rating on the individual session page, as well as included the number of ratings.


##Next Steps
the first next step is authentication, I'm thinking I'll try JWT auth, but if I cant get that to work I've done token auth through DRF before and that shouldnt be a problem. then creating a dashboard to add/edit/remove sessions and speakers. then the google sheets integration. I would also like to write tests for the backend


#Day 2
##Auth

Here we have a question, what is a user? is a speaker a user? If so what will a speaker be able to do?
For the purposes of this assessment I'm going to assume a user is an "orginizer" of sorts. This user will be able to create edit and delete sessions, as well as speakers....

In the end, I decided to make it so users are anyone that want to create a session. once registered and logged in, users can create sessions and speakers. When creating a speaker users have a dropdown menu that is populated with all their sessions. they can also add a speaker without including a session, however I still have to add a way to add already existing speakers to already existing sessions.

Also need to add edit/ delete functionality to speakers and sessions.

I ended up using DRF token auth, as I was familiar with it, I'd like to add a way to delete tokens on logout, and create a new one on login.

I'm still not sure the best way to handle authentication in React, in the previous project I used it, we ended up having every page/component check to see if the user was logged in, this ended up making the app rather clunky imo, so this time I decided to try something different.

now, the App component handles all the authentication checking. and simply either passes a "loggedIn" boolean to components where things are conditionally rendered based on if the user is logged in (eg showing "Login/Register" or "Logout" in the header) or, allows private routes in the Router, which is a component from "https://tylermcginnis.com/react-router-protected-routes-authentication/" which works quite well in my opinion. This has the effect that if an unauthenticated user were to navigate to a private route they are automatically redirected to the login page.

##Google Sheets

This was actually pretty easy, now, a user can only leave a rating if they are logged in, and when the user leaves a rating it adds a row to a google sheet with the timestamp, rating, id of the session and the users first and last name. This was accomplished by using the google sheets api (obviously).

##Progress

Overall I am very happy with the progress I made today, as stated above the obvious next step is to add edit/delete functionality for sessions and speaker and add a way to add existing speakers to sessions. this would mean that speakers would need an owner attribute.

Then I think it's just some styling and testing, pretty good for 2 days work.
