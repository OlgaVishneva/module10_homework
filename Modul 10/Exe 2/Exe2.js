const screenWidth = window.screen.width
         const screenHeight = window.screen.height

         const btn = document.querySelector('.btn');

         btn.addEventListener('click', () => {
            alert('screen Width is: ' + screenWidth + '; ' + 'screen Height is: ' + screenHeight);
         })