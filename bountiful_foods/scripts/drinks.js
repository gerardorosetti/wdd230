// const today = Date.now();

if (!localStorage.getItem("drinks")) {
	localStorage.setItem("drinks", 0);
}

// const toSet = parseInt(today) - parseInt(localStorage.getItem("visitDate"));

// localStorage.setItem("visitDate", today);

// const days = toSet*1.1574e-8

const drinks_submitted = document.getElementsByClassName("drinks-submitted")[0];
if (drinks_submitted){
	//Verify
    if (localStorage.getItem("drinks") == 0)
	    drinks_submitted.innerHTML = "You have not submitted any drink, Go to the Fresh section and do it!!! You will not regret it!!!";
    else
        drinks_submitted.innerHTML = `You have submitted ${localStorage.getItem("drinks")} specialty drinks!!! Go and enjoy ordering more fruit drinks in the Fresh section!!!`;
}