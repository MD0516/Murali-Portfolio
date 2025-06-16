import React, { useState } from 'react'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'

const Skills = () => {
  const frontEnd = [
    {
      logo : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M19.108 12.376q-.176-.201-.371-.403q.136-.144.264-.287c1.605-1.804 2.283-3.614 1.655-4.701c-.602-1.043-2.393-1.354-4.636-.918q-.331.065-.659.146q-.063-.216-.133-.43C14.467 3.49 13.238 1.999 11.982 2c-1.204 0-2.368 1.397-3.111 3.558q-.11.32-.203.644q-.219-.054-.44-.1c-2.366-.485-4.271-.165-4.898.924c-.601 1.043.027 2.75 1.528 4.472q.224.255.46.5c-.186.19-.361.381-.525.571c-1.465 1.698-2.057 3.376-1.457 4.415c.62 1.074 2.498 1.425 4.785.975q.278-.055.553-.124q.1.351.221.697C9.635 20.649 10.792 22 11.992 22c1.24 0 2.482-1.453 3.235-3.659c.06-.174.115-.355.169-.541q.355.088.715.156c2.203.417 3.952.09 4.551-.95c.619-1.075-.02-2.877-1.554-4.63ZM4.07 7.452c.386-.67 1.943-.932 3.986-.512q.196.04.399.09a20.464 20.464 0 0 0-.422 2.678A20.887 20.887 0 0 0 5.93 11.4q-.219-.227-.427-.465C4.216 9.461 3.708 8.081 4.07 7.452Zm3.887 5.728c-.51-.387-.985-.783-1.416-1.181c.43-.396.905-.79 1.415-1.176q-.028.589-.027 1.179q0 .59.028 1.178Zm0 3.94a7.237 7.237 0 0 1-2.64.094a1.766 1.766 0 0 1-1.241-.657c-.365-.63.111-1.978 1.364-3.43q.236-.273.488-.532a20.49 20.49 0 0 0 2.107 1.7a20.802 20.802 0 0 0 .426 2.712q-.25.063-.505.114Zm7.1-8.039q-.503-.317-1.018-.613q-.508-.292-1.027-.563a18.7 18.7 0 0 1 1.739-.635a18.218 18.218 0 0 1 .306 1.811ZM9.68 5.835c.636-1.85 1.578-2.98 2.304-2.98c.773-.001 1.777 1.218 2.434 3.197q.064.194.12.39a20.478 20.478 0 0 0-2.526.97a20.061 20.061 0 0 0-2.52-.981q.087-.3.188-.596Zm-.4 1.424a18.307 18.307 0 0 1 1.73.642q-1.052.542-2.048 1.181c.08-.638.187-1.249.318-1.823Zm-.317 7.66q.497.319 1.009.613q.522.3 1.057.576a18.196 18.196 0 0 1-1.744.665a19.144 19.144 0 0 1-.322-1.853Zm5.456 3.146a7.236 7.236 0 0 1-1.238 2.333a1.766 1.766 0 0 1-1.188.748c-.729 0-1.658-1.085-2.29-2.896q-.112-.321-.206-.648a20.109 20.109 0 0 0 2.53-1.01a20.8 20.8 0 0 0 2.547.979q-.072.249-.155.494Zm.362-1.324a19.267 19.267 0 0 1-1.762-.646q.509-.267 1.025-.565q.53-.306 1.032-.627a18.152 18.152 0 0 1-.295 1.838Zm.447-4.743q0 .911-.057 1.82c-.493.334-1.013.66-1.554.972c-.54.311-1.073.597-1.597.856q-.827-.396-1.622-.854q-.79-.455-1.544-.969q-.07-.91-.07-1.822q0-.911.068-1.821a24.168 24.168 0 0 1 3.158-1.823q.816.397 1.603.851q.79.454 1.55.959q.065.914.065 1.831Zm.956-5.093c1.922-.373 3.37-.122 3.733.507c.387.67-.167 2.148-1.554 3.706q-.115.129-.238.259a20.061 20.061 0 0 0-2.144-1.688a20.04 20.04 0 0 0-.405-2.649q.31-.076.608-.135Zm-.13 3.885a18.164 18.164 0 0 1 1.462 1.188a18.12 18.12 0 0 1-1.457 1.208q.023-.594.023-1.188q0-.604-.028-1.208Zm3.869 5.789c-.364.631-1.768.894-3.653.538q-.324-.061-.664-.146a20.069 20.069 0 0 0 .387-2.682a19.94 19.94 0 0 0 2.137-1.715q.177.183.336.364a7.234 7.234 0 0 1 1.403 2.238a1.766 1.766 0 0 1 .054 1.403Zm-8.819-6.141a1.786 1.786 0 1 0 2.44.654a1.786 1.786 0 0 0-2.44-.654Z"/></svg>,
      title : 'React',
      description : 'JavaScript library for building modular and dynamic user interfaces',
      link : 'https://react.dev/'
    },
    {
      logo : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873c-.736-.345-1.554-.585-1.797-1.14c-.091-.33-.105-.51-.046-.705c.15-.646.915-.84 1.515-.66c.39.12.75.42.976.9c1.034-.676 1.034-.676 1.755-1.125c-.27-.42-.404-.601-.586-.78c-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005c-1.14 1.291-.811 3.541.569 4.471c1.365 1.02 3.361 1.244 3.616 2.205c.24 1.17-.87 1.545-1.966 1.41c-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109c1.74 1.756 6.09 1.666 6.871-1.004c.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805c0 1.232.063 2.363-.138 2.711c-.33.689-1.18.601-1.566.48c-.396-.196-.597-.466-.83-.855c-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517c.855.51 2.004.675 3.207.405c.783-.226 1.458-.691 1.811-1.411c.51-.93.402-2.07.397-3.346c.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>,
      title : 'JavaScript ',
      description : 'Adds interactivity and dynamic behavior to websites',
      link : 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },
    {
      logo : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361a5.093 5.093 0 0 0-.717-.26a5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529c.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416c.47.197.892.407 1.266.628c.374.222.695.473.963.753c.268.279.472.598.614.957c.142.359.214.776.214 1.253c0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085a4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164a5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09c.249-.06.456-.144.623-.25c.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089a2.12 2.12 0 0 0-.537-.5a5.597 5.597 0 0 0-.807-.444a27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405c-.45-.553-.676-1.222-.676-2.005c0-.614.123-1.141.369-1.582c.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629a7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>,
      title : 'TypeScript',
      description : 'JavaScript with static typing for better scalability and error-checking',
      link : 'https://www.typescriptlang.org/'
    },
    {
      logo : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8c1.2-1.6 2.6-2.2 4.2-1.8c.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8c-1.2 1.6-2.6 2.2-4.2 1.8c-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8c1.2-1.6 2.6-2.2 4.2-1.8c.913.228 1.565.89 2.288 1.624c1.177 1.194 2.538 2.576 5.512 2.576c3.2 0 5.2-1.6 6-4.8c-1.2 1.6-2.6 2.2-4.2 1.8c-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
      title : 'Tailwind CSS',
      description : 'Utility-first CSS framework for fast, custom designs',
      link : 'https://tailwindcss.com/'
    },
    {
      logo : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466c0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268c-.407 1.319-.463 2.937-.42 4.186c.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5c.043-1.249-.013-2.867-.42-4.186c-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268c.408-1.319.464-2.937.42-4.186c-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5c-.043 1.249.013 2.867.42 4.186c.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213c0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z"/></svg>,
      title : 'Bootstrap ',
      description : 'Prebuilt responsive components and grid system for quick UI builds',
      link : 'https://getbootstrap.com/'
    },
    {
      logo : <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1024 1024"><path fill="currentColor" d="M807 480q-109 0-186-77t-77-186q0-64 36-121.5T672 0q-4 10-12.5 31t-13 32t-12 29.5t-11 30T616 148t-6 24.5t-2 19.5q0 95 64.5 159.5T832 416q9 0 19.5-2t24.5-6t25.5-7.5t30-11t29.5-12t32-13t31-12.5q-38 56-95.5 92T807 480zm-71 160q61 0 114.5-7T992 608q-55 62-133 95t-167 33q-110 0-203-54T342 535t-54-202q0-90 33-168t95-133q-18 88-25 141.5T384 288q0 94 48 175t129 129t175 48zM576 896q183 0 320-32q-70 78-170 119t-214 41q-139 0-257-68.5T68.5 769T0 512q0-114 41-214t119-170q-32 137-32 320q0 91 35.5 174T259 765t143 95.5T576 896z"/></svg>,
      title : 'jQuery',
      description : 'Simplifies DOM manipulation and enhances legacy projects',
      link : 'https://jquery.com/'
    },
  ]

  const backEnd = [
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M11.174 22.555c.256.139.531.218.826.218c.295 0 .59-.08.826-.178l7.848-4.572c.511-.297.826-.851.826-1.445V7.454c0-.593-.315-1.148-.826-1.444l-7.848-4.572a1.746 1.746 0 0 0-1.652 0L3.326 6.01A1.672 1.672 0 0 0 2.5 7.454v9.124c0 .594.315 1.148.826 1.445l2.065 1.188c1.003.494 1.358.494 1.81.494c1.475 0 2.32-.91 2.32-2.474V8.226a.24.24 0 0 0-.235-.237H8.283a.24.24 0 0 0-.236.237v9.005c0 .693-.728 1.386-1.889.792l-2.143-1.247c-.08-.04-.118-.138-.118-.218V7.435c0-.08.039-.179.118-.218l7.848-4.552c.058-.04.157-.04.235 0l7.849 4.552c.078.04.118.119.118.218v9.123c0 .1-.04.178-.118.218l-7.849 4.572c-.059.04-.157.04-.236 0L9.857 20.14c-.059-.04-.138-.06-.197-.02c-.55.317-.649.356-1.18.534c-.118.04-.314.119.079.337zm-.885-8.985c0 1.346.708 2.929 4.15 2.929c2.478 0 3.914-.99 3.914-2.731c0-1.702-1.141-2.158-3.56-2.474c-2.44-.317-2.695-.495-2.695-1.069c0-.475.217-1.108 2.026-1.108c1.613 0 2.222.356 2.459 1.444a.23.23 0 0 0 .216.179h1.042c.06 0 .118-.04.158-.08a.322.322 0 0 0 .059-.178c-.157-1.9-1.396-2.77-3.914-2.77c-2.242 0-3.58.95-3.58 2.553c0 1.721 1.338 2.196 3.481 2.414c2.577.258 2.774.634 2.774 1.148c0 .89-.708 1.267-2.36 1.267c-2.085 0-2.538-.515-2.695-1.564c0-.118-.098-.198-.216-.198h-1.023a.24.24 0 0 0-.236.238"/></svg>,
      title: 'Node.js',
      description: 'JavaScript runtime for building fast and scalable backend applications',
      link: 'https://nodejs.org/'
    },
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M15.347 14.228c.355-.258.904-.484.904-.484s-1.485.258-3 .42c-1.84.096-3.808.16-4.808 0C6.088 13.84 9.7 12.97 9.7 12.97s-1.42-.097-3.194.774c-2 .968 5.13 1.42 8.84.484m-3.29-1.29c-.775-1.678-3.26-3.13 0-5.679C16.088 4.033 13.991 2 13.991 2c.871 3.323-2.968 4.323-4.323 6.356c-.936 1.355.484 2.871 2.387 4.582m4.452-6.84s-6.872 1.742-3.582 5.484c.968 1.097-.258 2.098-.258 2.098s2.452-1.259 1.323-2.872c-1.032-1.484-1.871-2.226 2.517-4.71m-.226 10.518c-.032.032-.032.032-.032.096c5-1.322 3.194-4.678.774-3.807a.5.5 0 0 0-.323.258c.13-.032.258-.097.452-.129c1.13-.226 2.872 1.646-.871 3.582m1.807 2.452s.548.451-.646.806c-2.258.678-9.388.871-11.389.033c-.742-.323.646-.775 1.033-.872c.451-.096.677-.032.677-.032c-.774-.548-5.13 1.097-2.194 1.549c8.034 1.355 14.616-.517 12.519-1.484m-8.712-1.614c-3.032.872 1.872 2.646 5.776.968a7 7 0 0 1-1.097-.548c-1.775.355-2.55.355-4.13.193c-1.323-.16-.549-.613-.549-.613m7.034 3.808c-3.033.548-6.905.483-9.13.129c0 0 .451.355 2.806.548c3.582.226 9.13-.129 9.26-1.871c0 0-.226.71-2.936 1.194m-1.742-5.485c-2.323.451-3.678.451-5.356.258c-1.323-.13-.452-.774-.452-.774c-3.355 1.129 1.871 2.42 6.647 1c-.29-.097-.549-.258-.84-.484"/></svg>,
      title: 'Java',
      description: 'Versatile OOP language used in web, mobile, and enterprise applications',
      link: 'https://www.oracle.com/java/'
    },
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1024 1024"><path fill="currentColor" d="M832 768H544q-13 0-22.5 9.5T512 800t9.5 22.5T544 832h192q13 0 22.5 9.5T768 864v32q0 53-37.5 90.5T640 1024H448q-53 0-90.5-37.5T320 896V672q0-53 21.5-74.5T416 576h256q53 0 106.5-53.5T832 416V256h64q53 0 90.5 37.5T1024 384v192q0 73-59.5 132.5T832 768zM576 944q0 7 4.5 11.5T592 960h32q7 0 11.5-4.5T640 944v-32q0-7-4.5-11.5T624 896h-32q-7 0-11.5 4.5T576 912v32zm64-432H384q-53 0-90.5 37.5T256 640v128H128q-53 0-90.5-37.5T0 640V448q0-73 59.5-132.5T192 256h288q13 0 22.5-9.5T512 224t-9.5-22.5T480 192H288q-13 0-22.5-9.5T256 160v-32q0-53 37.5-90.5T384 0h256q53 0 90.5 37.5T768 128v256q0 53-37.5 90.5T640 512zM448 80q0-7-4.5-11.5T432 64h-32q-7 0-11.5 4.5T384 80v32q0 7 4.5 11.5T400 128h32q7 0 11.5-4.5T448 112V80z"/></svg>,
      title: 'Python',
      description: 'Simple, readable language often used for scripting, automation, and APIs',
      link: 'https://www.python.org/'
    }
  ];

  const developmentTools = [
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039a1.837 1.837 0 0 1-2.6 0a1.846 1.846 0 0 1-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348a1.848 1.848 0 0 1 0 2.6a1.844 1.844 0 0 1-2.609 0a1.834 1.834 0 0 1 0-2.598c.182-.18.387-.316.605-.406V8.835a1.834 1.834 0 0 1-.996-2.41L7.636 3.7L.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477a1.545 1.545 0 0 0 2.186 0l10.43-10.43a1.544 1.544 0 0 0 0-2.187"/></svg>,
      title: 'Git',
      description: 'Tracks code changes and supports collaboration through version control',
      link: 'https://git-scm.com/'
    },
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 432 416"><path fill="currentColor" d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"/></svg>,
      title: 'GitHub',
      description: 'Code hosting platform for version control and collaborative development',
      link: 'https://github.com/'
    },
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 1 1-7 0zm-7 7A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0zm0-7A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></g></svg>,
      title: 'Figma',
      description: 'Design and prototyping tool used for creating UI/UX layouts',
      link: 'https://www.figma.com/'
    },
    {
      logo: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1025 1025"><path fill="currentColor" d="m1014.86 967l-47 48q-10 9-24 9t-24-9l-151-152q-60 34-128 34q-106 0-181-75t-75-181t75-181t181-75t181 75t75 181q0 68-34 127l152 152q10 10 10 23.5t-10 23.5zm-373.5-518q-79.5 0-136 56t-56.5 135.5t56.5 136t136 56.5t135.5-56.5t56-136t-56-135.5t-135.5-56zm63.5-122v-6q0-27 19-45.5t45-18.5h128q27 0 46 18.5t19 45.5v320h-1q0-115-72.5-203.5T704.86 327zm-320 122V193q0-27 19-45.5t45-18.5h128q27 0 45.5 18.5t18.5 45.5v128q-77 0-144 34.5t-112 93.5zm0 383q45 60 112 94.5t144 34.5h64q0 26-18.5 45t-45.5 19h-576q-26 0-45-19t-19-45.5t18.5-45t45.5-18.5V64q0-26 19-45t45-19h128q27 0 45.5 19t18.5 45v833h64v-65z"/></svg>,
      title: 'SEO Basics',
      description: 'Optimizing websites for better visibility and search engine ranking',
      link: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'
    }
  ];

  const [formValue, setFormValue] = useState('');

  const handleChange = (e) => {
    setFormValue(e.target.value);
  }

  const foundFrontEndItems = frontEnd.filter(item => item.title.toLowerCase().startsWith(formValue.toLowerCase()))
  const foundBackEndItems = backEnd.filter(item => item.title.toLowerCase().startsWith(formValue.toLowerCase()))
  const foundDevelopmentEndItems = developmentTools.filter(item => item.title.toLowerCase().startsWith(formValue.toLowerCase()))


  return (
    <div className='content-height'>
      <AnimatePresence>
        <motion.div initial={{opacity: 0, y:-400}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-400}} transition={{duration:.8, ease: 'easeInOut'}} className='container-fluid py-2 custom-color-responsiveness'>
          <h2 className='text-white fs-1 fw-bolder'>Tools I Use Daily</h2>
          <p className='fw-bold fs-5'>From coding to deployment — here’s what I use regularly</p>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div initial={{opacity: 0, y:1400}} animate={{opacity:1, y:0}} exit={{opacity:0, y:1400}} transition={{duration:.8, ease: 'easeInOut'}} className='container-fluid py-2 custom-color-responsiveness'>
          <div className='search-box'>
            <label htmlFor="searchBox">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 376 384"><path fill="currentColor" d="m267 235l106 106l-32 32l-106-106v-17l-6-6q-39 33-90 33q-58 0-98.5-40.5T0 138.5t40.5-98t98-40.5t98 40.5T277 139q0 51-33 90l6 6h17zm-128 0q40 0 68-28t28-68t-28-68t-68-28t-68 28t-28 68t28 68t68 28z"/></svg>
            </label>
            <input type="text" name='searchBox' id='searchBox' placeholder='Search Tools...' value={formValue} onChange={handleChange} />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className='skill-content'>
        {
          (formValue === '' || foundFrontEndItems.length > 0) ? (
            <div className='container-fluid py-2 custom-color-responsiveness '>
              <div className='heading text-white fs-2 fw-semibold p-3'>
                Front-End Technologies
                <p className='fs-5 fw-normal pt-1' style={{backgroundColor:'#1d1d1d', color:'#858585'}}>Crafting interactive and responsive interfaces using modern front-end technologies</p>
              </div>

              <div className='row row-custom g-4 p-3 skill-section'>
                <AnimatePresence>
                  {
                    (formValue ? foundFrontEndItems : frontEnd).map((index, i) => {
                      const fromDir = i % 2 == 0 ? -200 : 200
                      return (
                        <motion.div initial={{opacity: 0, x: fromDir}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.8, delay: i * 0.1, ease: 'easeInOut'}} viewport={{once: true}} className='col-12 col-lg-6 p-2' key={i}>                
                          <a href={index.link} target='_blank' className='text-decoration-none '>
                            <div className='skill d-flex flex-column gap-2'>
                              <div className='d-flex flex-row align-items-center gap-2'>
                                {index.logo}
                                <h5 className='d-flex flex-row align-items-center gap-1 external-link'>
                                  {index.title}
                                  <svg xmlns="http://www.w3.org/2000/svg"  width="15" height="15" viewBox="0 0 20 20"><g fill="currentColor"><path d="M11 3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z"/><path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z"/></g></svg>
                                </h5>
                              </div>                      
                              <p>{index.description}</p>
                            </div>
                          </a>
                        </motion.div>
                      )
                    })
                  }
                </AnimatePresence>
              </div>        
            </div>) : (
            <div className='container-fluid py-2 custom-color-responsiveness ' >
              <div className='heading text-white fs-2 fw-semibold p-3'>
                Front-End Technologies
                <p className='fs-5 fw-normal pt-1' style={{backgroundColor:'#1d1d1d', color:'#858585'}}>Crafting interactive and responsive interfaces using modern front-end technologies</p>
              </div>

              <div className='row row-custom g-4 p-3 skill-section'>
                No matching Front-End Tools found
              </div>
            </div> 
            )
        }

        { (formValue === '' || foundBackEndItems.length > 0) ? (
          <div className='container-fluid py-2 custom-color-responsiveness '>
            <div className='heading text-white fs-2 fw-semibold p-3'>
              Full-Stack Foundations
              <p className='fs-5 fw-normal pt-1' style={{backgroundColor:'#1d1d1d', color:'#858585'}}>Currently expanding my skills in backend development to complete the full-stack journey</p>
            </div>

            <div className='row row-custom g-4 p-3 skill-section'>
              {
                (formValue ? foundBackEndItems : backEnd).map((index, i) => {
                  const fromDir = i % 2 == 0 ? -200 : 200
                  return (
                    <motion.div initial={{opacity: 0, x: fromDir}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.8, delay: i * 0.1, ease: 'easeInOut'}} viewport={{once: true}} className='col-12 col-lg-6 ' key={i}>                
                      <a href={index.link} target='_blank' className='text-decoration-none'>
                        <div className='skill d-flex flex-column gap-2'>
                          <div className='d-flex flex-row align-items-center gap-3'>
                            {index.logo}
                            <h5 className='d-flex flex-row align-items-center gap-1 external-link'>
                              {index.title}
                              <svg xmlns="http://www.w3.org/2000/svg"  width="15" height="15" viewBox="0 0 20 20"><g fill="currentColor"><path d="M11 3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z"/><path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z"/></g></svg>
                            </h5>
                          </div>                      
                          <p>{index.description}</p>
                        </div>
                      </a>
                    </motion.div>
                  )
                })
              }
            </div>        
          </div> ) : (
            <div className='container-fluid py-2 custom-color-responsiveness ' >
              <div className='heading text-white fs-2 fw-semibold p-3'>
                Full-Stack Foundations
                <p className='fs-5 fw-normal pt-1' style={{backgroundColor:'#1d1d1d', color:'#858585'}}>Currently expanding my skills in backend development to complete the full-stack journey</p>
              </div>

              <div className='row row-custom g-4 p-3 skill-section'>
                No matching Back-End Tools found
              </div>
            </div> 
          )
        }

        { (formValue === '' || foundDevelopmentEndItems.length > 0) ? (
          <div className='container-fluid py-2 custom-color-responsiveness '>
            <div className='heading text-white fs-2 fw-semibold p-3'>
              Developer Toolkit
              <p className='fs-5 fw-normal pt-1' style={{backgroundColor:'#1d1d1d', color:'#858585'}}>Tools I rely on for efficient development, collaboration, and design workflow</p>
            </div>

            <div className='row row-custom g-4 p-3 skill-section'>
              {
                (formValue ? foundDevelopmentEndItems : developmentTools).map((index, i) => {
                  const fromDir = i % 2 == 0 ? -200 : 200
                  return (
                    <motion.div initial={{opacity: 0, x: fromDir}} whileInView={{opacity: 1, x: 0}} transition={{duration: 0.8, delay: i * 0.1, ease: 'easeInOut'}} viewport={{once: true}} className='col-12 col-lg-6 ' key={i}>                
                      <a href={index.link} target='_blank' className='text-decoration-none'>
                        <div className='skill d-flex flex-column gap-2'>
                          <div className='d-flex flex-row align-items-center gap-3'>
                            {index.logo}
                            <h5 className='d-flex flex-row align-items-center gap-1 external-link'>
                              {index.title}
                              <svg xmlns="http://www.w3.org/2000/svg"  width="15" height="15" viewBox="0 0 20 20"><g fill="currentColor"><path d="M11 3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z"/><path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z"/></g></svg>
                            </h5>
                          </div>                      
                          <p>{index.description}</p>
                        </div>
                      </a>
                    </motion.div>
                  )
                })
              }
            </div>        
          </div> ) : ( 
            <div className='container-fluid py-2 custom-color-responsiveness ' >
              <div className='heading text-white fs-2 fw-semibold p-3'>
                Developer Toolkit
                <p className='fs-5 fw-normal pt-1' style={{backgroundColor:'#1d1d1d', color:'#858585'}}>Tools I rely on for efficient development, collaboration, and design workflow</p>
              </div>

              <div className='row row-custom g-4 p-3 skill-section'>
                No matching Development Tools found
              </div>
            </div> )
        }

      </div>

    </div>
  )
}

export default Skills