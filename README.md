## Edit JSON (Takes less time)

- Load json in textarea and edit the json
- Validate the json after edit

## create json

- Give the basic template to fill the values where we will give keys 
- A simple UI to let us know: 
- How many tabs in each tab type
- How many questions to be created in each tab category
- This will help us to create a sample json to fill the values

``______________________________________________________________________``

### Edit JSON (Takes more time)

- Get json schema by doing json schema call
- Populate json in similar way as it is currently displayed in CCAT with Edit Capability --- Medium (Not feasible as it doesn to give all options to edit)
- Or load the raw json inside a textarea to edit --- Easy (can edit any value which can make json invalid or may break the code, can't control the edit)
- Or load json with form fields --- Difficult (Can only edit editable values and can control what to edit)


### Create a new JSON (We can make the JSON object keys also dynamic along with content)

#### workflow name

- Enter workflow name
- Enter version
- Workflow name will be workflow + version .json

#### Workflow Tabs

- Enter tab type (Technical Feasibility or Value Economic Screening)
- Each tab type will be a single object with 'id', 'name', 'label' and 'innerTabs' array
- Each tab will be a single object placed inside "innerTabs" array

##### Tabs 

- Enter Tab name
- Each tab will be a object with 'id', 'name', 'type', 'label' and 'content' array
- Content array will be combination of objects wich contains Questions, Results, Statements

- Select options with Questions, Result, Statement

###### If Question (How to create unique id for each questions and same will be used in db to create modal variable)
- Question is a object consists of 'id', 'name', 'type', 'label', 'condition', 'theme', 'dwfsUrl', 'dwfsTab', 'options'

- 'options' is a array of object where each object consists of 'name', 'label', 'value'
- 'options' name will be same as Question's id so it will be prepopulated and non-editable

- condition (i.e. "{IsBHTLessThan300} == '> 300º F'")
- condition is used to enable disable question, statement or result
- For giving condition we can create a dropdown with question and options and after selection the appropriate condition will be created by code

- 'theme' it is used for giving background to question
- It will be a dropdown with 'pass - green', 'fail - red', 'warning - orange', 'incomplete - gray', 'statement - white'


###### If Result (How to create id here the result will not be stored in db)
- Result is a object consists of 'id', 'name', 'type', 'label', 'condition', 'enablecolor', 'disablecolor'
- condition (i.e. "{IsBHTLessThan300} == '> 300º F'")
- condition is used to enable disable question, statement or result
- For giving condition we can create a dropdown with question and options and after selection the appropriate condition will be created by code

- 'enablecolor' & 'disablecolor' will be a dropdown with 'pass - green', 'fail - red', 'warning - orange', 'incomplete - gray', 'statement - white'


###### If Statement (How to create id as it will be stored in db)
- Statement is a object consists of 'id', 'name', 'label', 'type'