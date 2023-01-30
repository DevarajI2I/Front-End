function form() {
   let formData = { name : document.getElementById("name").value,
                 phoneNumber : document.getElementById("phoneNumber").value,
                 address : document.getElementById("address").value,
                 landmark : document.getElementById("landmark").value,
                 date : document.getElementById("date").value,
                 genderType: sex(),
                 preferences : document.getElementById("preference").value,
                 hotelPreference : hotel()} 
    function sex() {
       let gender = document.getElementsByName('gender');
        for (i = 0; i < gender.length; i++) {
            if (gender[i].checked)
            return gender[i].value;
        }
    }
    function hotel() {
        let preference =  document.getElementsByName("hotelPreference");
        let type = [];
        for (i = 0; i < preference.length; i++ ) {
            if(preference[i].checked)
            type.push(preference[i].value);
        }
        return type;
    }
    let size = formData.hotelPreference.length;
    if (size == 0) {
        alert("hotel perference Must !");
        return false;
    } 
   console.log(formData);
   document.write(formData);
}








