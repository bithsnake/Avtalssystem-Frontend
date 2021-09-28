# Avtalssystem Frontend Info
 Ett frontend som jag har byggt i React under 1 månad där jag även lärde mig React undertiden. Obs Inte klar.




# Avtalssystem Frontend Documentation

## **Relational component map**
The flowchart in this application is as the following example
![Avtalssystem component flowchart](https://user-images.githubusercontent.com/39192814/120978279-98493380-c774-11eb-83ca-6c063468b471.png)




## AuthContextProvider
#
**NOTE:** Whenever the word **Context** is mentioned, we are referring to **AuthContextProvider** 
#

# 

### **Purpose**
The **AuthContextProvider** is located in the **Index.js** Component where everything is rendered.
And the **AuthContextProvider** is wrapped around **App.js**, which means that it becomes a global store
where you can get and set values without the need to lift up any values through component properties. These can be considered as global values and functions.

#### **API Calls**
Api calls are done from the Context by first importing the **AuthContext** object from **AuthContextProvider**.
You can get a list of all the different api calls you can do by accessing the context.

##### **Example**
```jsx
import {useContext, useEffect} from "react";
import AuthContext from 'path to /store/auth-context'
functionalcomponent () => {
const ctx = useContext(AuthContext);

useEffect(() => {
const allUsers = ctx.apiOnGetAllUsers();
console.table(allUsers);
},[]);


return (
<>
<SomeComponent/>
</>
);
}

export default functionalcomponent;
```

#### **Static variables**
Static variables are all set inside the Context. Values that are set here are loggedInUserID, tokenString etc. All the static values
are accessible from the context.

![ContextVariables](https://user-images.githubusercontent.com/39192814/120979455-eb6fb600-c775-11eb-8391-3826598a6962.png)


Important values of the current logged in user that are stored in the Context:
<ul>
  <li>tokenString</>
  <li>permission</li>
  <li>loggedInUserID</li>
  <li>user (the whole object)</li>
  <li>customerId</li>
</ul>

 **Example:** ctx.permission = (ctx.permission < 0) ? foo : bar;
 
 **NOTE: The following values are stored in the localStorage.**
 <ul>
  <li>token (same as tokenString)</>
  <li>userId (same as loggedInUserID)</li>
  <li>CustomerId (same as customerId)</li>
</ul>

#

## BrowserRouter
# 
BrowserRouter allows us to use routing in the application where the components are rendererd depending on which **path** the **Router** has.
```jsx
    <>
      <main onMouseMove={ctx.checkIsAlive} className="wrapper content-wrapper">
        <Route render={{history}} path="/" exact><div className="login-bg center mx-sm-auto"><Login bypassLogin={ctx.bypassLogin} /></div></Route>
        <Route render={{history}} path="/home"><ul className=" navbar navbar-nav bg-white" onMouseMove={ctx.checkIsAlive}><NavMenu title="Some Company Name"/></ul> </Route>
        <Route render={{history}} path="/home/users" exact><UserMenu/></Route>
        <Route render={{history}} path={`/home/users/profile/:${ctx.userProfile.id}`} exact><UserProfile userdata={ctx.userProfile}/></Route>
        <Route render={{history}} path="/home/companies" exact><CompanyMenu/></Route>
        <Route render={{history}} path="/home/departments/" exact><DepartmentMenu/></Route>
        <Route render={{history}} path="/home/contracts" exact><ContractMenu/></Route>
      </main>
      <ModalFooter className=" justify-content-center">{`@anon ${copyrightYear.getFullYear()}`}</ModalFooter>
    </>
```
### **Route**
The Route component is used to wrap the components you want to render at that specific path

### exact
If you add the **exact** property in the **Router** Component you are restricting the **BrowserRouter** to render only that path, and **NOT** the **Route**´s that are inserted after the current **Route**

### **

## **Create, Edit, Delete**
# 

### **Create**

Users, Companies, Departments and Contracts are all created from forms resided in "New"Name

 **Example:** NewUser

#### **Requirements**

<ul>
  
<li>
  
**user.Permission :  1 or 2**
  
</li>
  
</ul>

### **Edit** (**WIP**)
Users, Companies, Departents and contracts are all edited from the **UserProfile** component. When "Spara" is pressed 
a PUT request is sent to the api.


#### **Requirements**
<ul>
  
<li>
  
**user.Permission :  1 or 2**
  
</li>
  
</ul>

### **Delete**

Users, Companies, Departents and contracts are all Deleted from the **UserProfile** menu.

#### **Requirements**

<ul>
  
<li>
  
**user.Permission :  1 or 2**
  
</li>
  
</ul>

**NOTE: Some specific values for the logged in user are stored in the Context.** 
