document.addEventListener('DOMContentLoaded' , function (){
    let input = document.querySelector('#input-box')
    let search = document.querySelector('#search')
    let stats_section = document.querySelector(".stats-section")
    let progress = document.querySelector(".progress")
    let esayProgress = document.querySelector(".esay-progress")
    let mediumProgress = document.querySelector(".medium-progress")
    let hardProgress = document.querySelector(".hard-progress")
    let esaylebel = document.querySelector('#easy-lebel')
    let mediumlebel = document.querySelector('#medium-lebel')
    let hardlebel = document.querySelector('#hard-lebel')
    let easybar = document.querySelector("#easybar")
    let mediumbar = document.querySelector("#mediumbar")
    let hardbar = document.querySelector("#hardbar")

   function validateUsername(username){
      if(username.trim() == ""){
        alert("you have not enterd anything")
        return false;
      }

      return true;
   }

   async function fetchUserDetails(username) {
      let api =  `https://leetcode-api-faisalshohag.vercel.app/${username}`
        try {

            //search button affect 
            search.textContent = "Searching..."
            search.disabled = true;

            // data fatching 
            let response = await fetch(api)
            if(!response.ok){
              throw new Error("unable to fetch data")
            }
            
            const data = await response.json();
           // console.log(data)
           // console.log(data.totalSubmissions[1].count)
           showDetailsOnUi(data);
            return data;
        } catch (error) {
            
        }finally{
              //search button affect 
            search.textContent = "Search"
            search.disabled = false;
        }
   }

  async function showDetailsOnUi(response){
      // for easy level view 
       let easyqn = response.totalSubmissions[1].count
      esaylebel.textContent = `Easy :: ${easyqn}`
      easybar.value = easyqn


      // for medium level view 
       let mediumqn = response.totalSubmissions[2].count
      mediumlebel.textContent = `Medium :: ${mediumqn}`
      mediumbar.value = mediumqn


      // for medium level view 
       let hardqn = response.totalSubmissions[3].count
      hardlebel.textContent = `Hard :: ${hardqn}`
      hardbar.value = hardqn

   }

    search.addEventListener('click', async(e) => {
       let username = input.value  ;
       console.log("logging as ueername " + username)
       // first we will validate the user : like it should not be null 
       if (validateUsername(username)) {
        try {
            // Fetch user details using async/await
            let data = await fetchUserDetails(username);
            showDetailsOnUi(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            // Optionally, show an error message on the UI
        }
        } else {
            console.error("Invalid username");
            // Optionally, show an invalid username message on the UI
        }
    })


})


