    
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const loginPOST = document.getElementById('btnLogin');
    const registerPOST = document.getElementById('btnRegister');

    if(loginPOST){
        loginPOST.addEventListener('click', () => {
            const username = document.getElementById('usernameLogin').value;
            const password = document.getElementById('passwordLogin').value;

            const data = JSON.stringify({
                username: username,
                password: password
            });

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(response => {
                if(response.status===204){
                    window.location.href = 'http://localhost:5500/src/Home_Page/';
                } else if(response.status===404){
                    alert('Usuario o contraseña incorrectos');
                } else{
                    alert('Error en el servidor');
                }
            })
            .catch(error =>{
                console.log('Error:', error);
            })
        });
    }

    if(registerPOST){
        registerPOST.addEventListener('click', () => {
            const username = document.getElementById('usernameRegister').value;
            const email = document.getElementById('emailRegister').value;
            const password = document.getElementById('passwordRegister').value;
            const confirmPassword = document.getElementById('passwordRegisterVer').value;
            
            if(password !== confirmPassword){
                alert('Las contraseñas no coinciden');
                return;
            }

            if(!(document.getElementById('TyCcheck')).checked){
                alert('Acepte los términos y condiciones');
                return;
            }

            const data = JSON.stringify({
                username: username,
                email: email,
                password: password
            });

            fetch('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(response => {
                if(response.status===200){
                    alert('Usuario creado');
                    wrapper.classList.remove('active');
                } else if(response.status===400){
                    alert('Usuario ya existe');
                } else if(response.status===409){
                    alert('Email ya existe');
                }
                else{
                    alert('Error en el servidor');
                }
            })
            .catch(error =>{
                
            })
        });
    }

    registerLink.addEventListener('click', ()=> {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', ()=> {
        wrapper.classList.remove('active');
    });
