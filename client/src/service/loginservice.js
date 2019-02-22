class LoginService{

    userAuthentication(userCrd){
        console.log("asdfsafd : ", userCrd);
        
        let promise = fetch("http://localhost:4040/api/login", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json"
                                },
                                body:JSON.stringify(userCrd)
                            });
        return promise;
    }
}

export default LoginService
