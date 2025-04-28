// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()



async function hidePost(postId) {
  console.log('Trying to hide:', postId); // ✅ See in browser console
  
  const response = await fetch(`/moments/v1/hide/${postId}`, {
    method: 'POST',
  });

  if (response.ok) {
    console.log('Post hidden successfully');
    document.getElementById(postId).style.display = 'none'; // ✅ Hide it
  } else {
    console.log('Failed to hide post');
    alert('Failed to hide post');
  }
}

