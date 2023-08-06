# Data

## MongoDB
Users Collection
| Field           | Type          | Description                          |
|-----------------|---------------|--------------------------------------|
| _id             | ObjectId      | Unique identifier for the user       |
| username        | String        | User's username                      |
| email           | String        | User's email address                 |
| password_hash   | String        | Hashed password                      |
| created_at      | ISODate       | Timestamp of user creation           |
| updated_at      | ISODate       | Timestamp of last update             |
| other_user_info | Object        | Additional user-specific data        |

Drone Missions Collection
| Field              | Type          | Description                                   |
|--------------------|---------------|-----------------------------------------------|
| _id                | ObjectId      | Unique identifier for the mission             |
| title              | String        | Title of the drone mission                    |
| description        | String        | Description of the drone mission              |
| location           | Object        | Location coordinates (latitude, longitude)    |
| start_datetime     | ISODate       | Start date and time of the mission            |
| end_datetime       | ISODate       | End date and time of the mission              |
| status             | String        | Status of the mission (e.g., scheduled, in progress, completed, canceled) |
| creator_id         | ObjectId      | Reference to the user who created the mission |
| created_at         | ISODate       | Timestamp of mission creation                 |
| updated_at         | ISODate       | Timestamp of last update                      |
| other_mission_info | Object        | Additional mission-specific data              |