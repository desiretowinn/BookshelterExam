"use strict";

let elForm = document.querySelector('.login-form')

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const email = evt.target.email.value;
	const password = evt.target.password.value;

    console.log(email);

	fetch('https://reqres.in/api/login', {
		method: 'post',
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			'Content-type': 'Application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			localStorage.setItem('token', data.token);

			window.location.href = '../index.html';
		});
});