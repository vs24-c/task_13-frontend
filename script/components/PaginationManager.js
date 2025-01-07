class PaginationManager {
        constructor(loadPage) {
          this.loadPage = loadPage;
      } 
  
        setupPagination(totalPages, currentPage) {
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = ''; 

        const btnPrev = document.createElement('button');
        btnPrev.textContent = 'Previous';
        btnPrev.id = 'prev-button';
        btnPrev.disabled = currentPage === 0;

        const btnNext = document.createElement('button');
        btnNext.textContent = 'Next';
        btnNext.id = 'next-button';
        btnNext.disabled = currentPage === totalPages - 1;

        const paginationList = document.createElement('ul');
        paginationList.className = 'pagination';

        for (let i = 0; i < totalPages; i++) {
          const pageItem = document.createElement('li');
          const pageLink = document.createElement('a');
          pageLink.href = '#';
          pageLink.textContent = i + 1;

          if (currentPage === i) {
            pageItem.classList.add('active');
          }

          pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            this.loadPage(i);
          });

          pageItem.appendChild(pageLink);
          paginationList.appendChild(pageItem);
        }

        paginationContainer.append(btnPrev, paginationList, btnNext);

        btnPrev.addEventListener('click', () => this.loadPage(currentPage - 1));
        btnNext.addEventListener('click', () => this.loadPage(currentPage + 1));
      }
}