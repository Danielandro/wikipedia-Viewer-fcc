//CALL WIKIMEDIA API https://en.wikipedia.org/w/api.php?action=opensearch&search=michael%20jackson&limit=10&namespace=0&format=jsonfm

function findAnswer() {
    var urlA = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='; /*API URL*/
    var urlB = '&limit=10&namespace=0&format=json&origin=*';
    var searchTerm = document.getElementById('search_box').value; /*SEARCH TERM*/
    var list = document.querySelector('.list'); // results list (ul)

    document.querySelector('.main').classList.add('move_search');
    // moveIt.addClass('move_search');
    list.innerHTML = '';

    if(searchTerm != ''){

    fetch(urlA + searchTerm + urlB).then(function(response) {

        if (response.status != 200) {
            console.log('There was a problem with the request - ' + response.status); // error case
            return;
        };

        response.json().then(function(json) {
            // var result = document.querySelector('.results'); // results container div
            
                        
            for(var i = 0; i < json[1].length; i++){ // HEADER
              var listNode = document.createElement('li'); // create new li node
              var newHeader = document.createElement('h1'); // create h1 element
              var newParagraph = document.createElement('p'); // create p element

              var link = document.createElement('a');
              link.setAttribute('href', json[3][i]);
              link.setAttribute('target', '_blank');
              
              var header = document.createTextNode(json[1][i]); // create text for header
              newHeader.appendChild(header); // insert text for h1 
              link.appendChild(newHeader); // append header to li

              var article = document.createTextNode(json[2][i]); // create text for p
              newParagraph.appendChild(article); // insert text for article
              link.appendChild(newParagraph);


              listNode.appendChild(link); // hyperlink to wiki article
              list.appendChild(listNode); // append li to page

              // console.log(link);
                
            }

           
        }).catch(function(err) {
            console.log('There was an error fetching that resource ', err)
        });
    });
};
};
document.getElementById('submit').addEventListener('click', findAnswer); /*LISTEN FOR SEARCH BUTTON CLICK*/