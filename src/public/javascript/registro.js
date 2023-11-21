// registro.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.horizontal-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Obtenha os dados do formulário
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      // Envie a solicitação de registro para o servidor
      try {
        const response = await fetch('/registrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.mensagem); // ou redirecione para a página de login
        } else {
          alert('Erro ao cadastrar. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
      }
    });
  });
  