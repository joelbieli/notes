# Note App

[TOC]

## Description

The planned program shall be a note taking application, implemented in Kotlin, offering the functionality of of looking at an overview of notes, creating a new note, looking at and editing an existing note and searching/filtering the notes. It shall offer two types of notes, a normal text note and a to-do/shopping list type note, both having basic markdown formatting support. It shall have a GUI, implemented in TornadoFX, that follows the MVC pattern.

## Use cases

![UseCaseDiagram.png](./images/UseCaseDiagram.png)

## Use case description

| Use Case                          | Look at overview of notes                    |
| --------------------------------- | -------------------------------------------- |
| Pre-Condition                     | The user has notes                           |
| Description of use case in detail | The user can see all his notes in a overview |
| Post-Condition                    |                                              |
| Exceptions                        |                                              |

| Use Case                          | Look at an existing note                                   |
| --------------------------------- | ---------------------------------------------------------- |
| Pre-Condition                     | The user has a note                                        |
| Description of use case in detail | The user can open a specific note and look at it in detail |
| Post-Condition                    |                                                            |
| Exceptions                        |                                                            |

| Use Case                          | Edit an existing note                                        |
| --------------------------------- | ------------------------------------------------------------ |
| Pre-Condition                     | The user has a note                                          |
| Description of use case in detail | The user can open a specific note, look at it in detail, edit it and save it |
| Post-Condition                    | The edited note is updated                                   |
| Exceptions                        |                                                              |

| Use Case                          | Create a new note                                            |
| --------------------------------- | ------------------------------------------------------------ |
| Pre-Condition                     |                                                              |
| Description of use case in detail | The user can create a new note which will then open it, he can edit is and save it |
| Post-Condition                    | A new note is created, containing what the user entered      |
| Exceptions                        |                                                              |

| Use Case                          | Delete an existing note             |
| --------------------------------- | ----------------------------------- |
| Pre-Condition                     | The user has a note                 |
| Description of use case in detail | The user can delete a specific note |
| Post-Condition                    | The notes is deleted                |
| Exceptions                        |                                     |

| Use Case                          | Search through the notes                                     |
| --------------------------------- | ------------------------------------------------------------ |
| Pre-Condition                     | The user has notes                                           |
| Description of use case in detail | The user can filter and search his notes and the matching ones will then be displayed |
| Post-Condition                    |                                                              |
| Exceptions                        |                                                              |

| Use Case                          | Export the notes as JSON                                     |
| --------------------------------- | ------------------------------------------------------------ |
| Pre-Condition                     | The user has a note                                          |
| Description of use case in detail | The user can export his notes, he will then have to specify the destination path after which, there will be created a JSON file there containing all his notes |
| Post-Condition                    | A file containing all the users notes is now at the specified destination path |
| Exceptions                        | The program does not have the permissions needed to create and write to the specified path |

## Conceptual Class Diagram

![ConceptualClassDiagram.png](./images/ConceptualClassDiagram.png)

## CRC Cards

| Class            | Search                                                       |
| ---------------- | ------------------------------------------------------------ |
| Responsibilities | Is part of the overview and allows you to search and filter your notes |
| Collaborations   | - Overview<br />- Data Manager                               |

| Class            | Overview                                                     |
| ---------------- | ------------------------------------------------------------ |
| Responsibilities | Displays all notes, lets you open one which will then open the editor and allows you to export your notes |
| Collaborations   | - Search<br />- Data Manager                                 |

| Class            | Editor                                           |
| ---------------- | ------------------------------------------------ |
| Responsibilities | Allows you to view your note, edit and delete it |
| Collaborations   | - Overview<br />- Data Manager                   |

| Class            | Note                        |
| ---------------- | --------------------------- |
| Responsibilities | Template for all note types |
| Collaborations   |                             |

| Class            | Text Note                                                    |
| ---------------- | ------------------------------------------------------------ |
| Responsibilities | A normal continuous text note with (potentially) support for Markdown formatting |
| Collaborations   | - Note                                                       |

| Class            | List Note                                                    |
| ---------------- | ------------------------------------------------------------ |
| Responsibilities | A to do / shopping list type list that allows you to check off the individual elements |
| Collaborations   | - Note                                                       |

| Class            | Export Controller                                            |
| ---------------- | ------------------------------------------------------------ |
| Responsibilities | Prompts the user to select a destination path, gets the notes from the data manager, converts them to JSON and saves them to a file |
| Collaborations   | - Data Manager                                               |

| Class            | Data Manager                              |
| ---------------- | ----------------------------------------- |
| Responsibilities | Manages data access to in memory database |
| Collaborations   |                                           |


## Mockup
![Web 1920 – 1.png](./images/OverviewMockup.png)

![Web 1920 – 2.png](./images/ViewerMockup.png )