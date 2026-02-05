// 1. Function to add minutes for Iqamah
function addMinutes(time, mins) {
    let [h, m] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(h, m + mins);
    return date.toTimeString().slice(0, 5);
}

// 2. Function to get Prayer Times using Coordinates
function getPrayerTimes(lat, lon) {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`)
        .then(res => res.json())
        .then(data => {
            const t = data.data.timings;
            const body = document.getElementById("times-body");
            
            // Your Mosque's Iqamah Settings (Change these numbers if needed)
            const iqamahDiff = {
                Fajr: 20,
                Dhuhr: 15,
                Asr: 15,
                Maghrib: 7,
                Isha: 15
            };

            const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
            body.innerHTML = ""; 

            prayers.forEach(p => {
                let row = `<tr>
                    <td><strong>${p}</strong></td>
                    <td>${t[p]}</td>
                    <td>${addMinutes(t[p], iqamahDiff[p])}</td>
                </tr>`;
                body.innerHTML += row;
            });
            
            document.getElementById("welcome-msg").innerText = "Location Synced: Times are Exact!";
        })
        .catch(err => alert("Error fetching times."));
}

// 3. Ask for Exact Location Permission
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Success! We have the exact location
            getPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        () => {
            // If they say "No" or it fails, use a default (Colombo)
            alert("Location denied. Showing default times for Colombo.");
            getPrayerTimes(6.9271, 79.8612); 
        }
    );
} else {
    alert("Geolocation is not supported by this browser.");
}