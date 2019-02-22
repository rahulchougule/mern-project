class PersonalInfoService{

    addPersonalInfo(user, token){
            
        let promise = fetch("http://localhost:4040/api/personalinfo", {
                                method:"POST",
                                headers:{
                                    "Content-type":"application/json",
                                    "Authorization":"Bearer "+token
                                },
                                body:JSON.stringify(user)
                            });
        return promise;
    }

    addPersonalInfoTemp(user, token){
            
        let promise = fetch("http://localhost:4040/api/personalinfotemp", {
                                method:"POST",
                                headers:{
                                    "Content-type":"application/json",
                                    "Authorization":"Bearer "+token
                                },
                                body:JSON.stringify(user)
                            });
        return promise;
    }
    getPersonalInfo(token){
        //console.log(user);
        
        let promise = fetch("http://localhost:4040/api/personalinfo", {
                            method:"GET",
                            headers:{
                                
                                "Content-type":"application/json",
                                "Authorization":"Bearer "+token
                            },
                           // body:JSON.stringify(user)
                            
                            
                        });
                    
                      //  console.log("promise return : ", promise);
                        return promise;  
                                      
        }

        getPersonalInfoTemp(token){
            //console.log(user);
            
            let promise = fetch("http://localhost:4040/api/personalinfotemp", {
                                method:"GET",
                                headers:{
                                    
                                    "Content-type":"application/json",
                                    "Authorization":"Bearer "+token
                                },
                               // body:JSON.stringify(user)
                                
                                
                            });
                        
                          //  console.log("promise return : ", promise);
                            return promise;  
                                          
            }

        getPersonalInfoByUserName(userName, token){

            let promise = fetch("http://localhost:4040/api/personalinfo/byusername/"+userName, {
                            method:"GET",
                            headers:{
                                
                                "Content-type":"application/json",
                                "Authorization":"Bearer "+token
                            },
                                                     
                            
                        });
                    
                    return promise;  

        }  
        getPersonalInfoOnSearch(userName,token){
            
            
            let promise = fetch("http://localhost:4040/api/personalinfo/byusername/"+userName, {
                                method:"GET",
                                headers:{
                                    
                                    "Content-type":"application/json",
                                    "Authorization":"Bearer "+token
                                },
                               // body:JSON.stringify(user)
                                
                                
                            });
                        
                          //  console.log("promise return : ", promise);
                            return promise;  
                                          
            }  

            updatePersonalInfo(user, token){
            
                let promise = fetch("http://localhost:4040/api/personalinfo", {
                                        method:"POST",
                                        headers:{
                                            "Content-type":"application/json",
                                            "Authorization":"Bearer "+token
                                        },
                                        body:JSON.stringify(user)
                                    });
                return promise;
            }    
             
            deletePersonalInfoTemp(userName, token){
                        let promise = fetch("http://localhost:4040/api/personalinfotemp/"+userName, {
                            method:"DELETE",
                            headers:{
                                "Content-type":"application/json",
                                "Authorization":"Bearer "+token
                            },
                            //body:JSON.stringify(userName)
                        });
                    return promise;
            }
          
}

export default PersonalInfoService;
