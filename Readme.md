# Notes on design

Permission to comment

To show you are 'aware' of the location you need to have say First part of postcode + a unique code given by someone involved in the brief.

##Data Objects:

###Process
Id's and descriptions of the process steps. Can be used to represent the stage in the process that each brief is currently in.

###TemplateDocuments
There are a number of template documents that are used for the production of the work once the artist has been selected. These are highly templated.

Need to track the status of these documents (have they been signed / completed correctly, are copies lodged with various legal entities, etc)

###'Users'

User / Signin is developed using PassportJS

//Users can sign in using Google / Facebook
Use local policy initially, add in OAuth w/Google, FB later

A user has a name, an email and a password.
They also have attributes:

Resident: Bool
Artist: Bool
MyMural: Bool
Other: Bool

Other is for any user who is not a resident of a place that has an open brief
Ie an interested visitor to the website, someone who knows the area, works nearby or walks past but does not live there

Admin users are treated separately.



##'Documents'

###Brief
    _id: Number (DB Created)
    title: String,
    description: String, 
    owner_id: String,
    height: Number,
    location: String,
    Status: String 

###Comments
    _id: Number (DB Created)
    date: Date
    briefId: Number
    userId: Number
    CommentText: Text


####Notes

* Title - Title for briefing
* Description - Introduction text
* Owner_id - ID of the associated user
* height - Height of the wall
* Location - Location information
* Status - Private / Public / Closed
  

# API 

##Brief Related

/brief
(GET)
Return Status 200

/brief/create 
(GET - Display Form)
(POST - Submit)
Create a briefing document

/brief/list
(GET - return list)
List all briefing documents currently in the system
** To Be Restricted **

/brief/view/:ID
(GET - Return document)
View the briefing document associated with ID

/brief/test/
(GET)
Return a message to check server is live

/brief/registerInterest
(POST)
To register interest the brief has to be live 
User has to be registered as an Artist
Adds Artist User_ID & comment text

/brief/askQuestion
(POST)
Ask a question on the brief


TBC
Edit Brief
Delete Brief
Edit Comments

##User Related

TBC 

PassportJS 

