document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const confirmDelete = confirm("Are you sure you want to delete this record?");
            if (confirmDelete) {
                const form = this.parentNode;
                form.submit();
            }
        });
    });
});


// back button js 

document.getElementById("backBtn").addEventListener("click", function() {
    window.history.back();
});