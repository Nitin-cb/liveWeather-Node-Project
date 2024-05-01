const lat=document.getElementById('lat');
const long=document.getElementById('long');
const city_name=document.getElementById('city_name');
const temp_real_val=document.getElementById('temp_real_val');
const temp_status=document.getElementById('temp_status');
const data_hide=document.querySelector(".middle_layer")

const submitBtn=document.getElementById('submitBtn')
const getInfo=async (event)=>{
    event.preventDefault();
    let latval=lat.value;
    let longval=long.value;
    if(latval===""||longval===""){
        city_name.innerText=`please enter the lat & long`
        data_hide.classList.add('data_hide')
    }else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?lat=${latval}&lon=${longval}&appid=086c5a59466cc1dfccc284ac027b6909`;
            const response= await fetch(url)
            const data=await response.json();
            const arrData=[data];

            city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
            temp_real_val.innerText=Math.floor(arrData[0].main.temp-273.71)
            const tempMood=arrData[0].weather[0].main;
            // console.log(response);
            
            if(tempMood=="Clear"){
                temp_status.innerHTML= `<i class="fa-solid fa-sun" style="color:yellow"></i>`
            }else if(tempMood=="Clouds"){
                temp_status.innerHTML= `<i class="fa-solid fa-cloud" style="color:white"></i>`
            }else if(tempMood=="Rainy"){
                temp_status.innerHTML=`<i class="fa-solid fa-cloud-sun-rain" style="color:blue></i>`
            }else{
                temp_status.innerHTML=`<i class="fa-solid fa-sun" style="color:blue></i>`
            }

            data_hide.classList.remove('data_hide')




        }catch{
            city_name.innerText=`please enter the lat & long properly`
            data_hide.classList.add('data_hide')

        }
    }
}
submitBtn.addEventListener('click',getInfo)