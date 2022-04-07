const APY_KEY = 'edee5a140a044ecaa1249a486a48de48'
const choicesElement = document.querySelector('.js-choice')
const newsList = document.querySelector('.news-list')

const choices = new Choices(choicesElement, {
	searchEnabled: false,
	itemSelectText: '',
	allowHTML: true
})

const getdata = async url =>{
	const response = await fetch(url, {
		headers: {
			'X-Api-Key': APY_KEY
		}
	})

	const data = await response.json()
	
	return data
}

const renderCart = (data) => {
	console.log(data)
	newsList.innerHTML = ''
	data.forEach(item => {
		const card =document.createElement('li')
		card.className = 'news-item'
		card.innerHTML = `
			<img class="news-image" src="${item.urlToImage}" alt="${item.title}" />
				<h3 class="news-title">
					<a class="news-link" href="${item.url}" target="_blank">${item.title}</a>
				</h3>
				<p class="news-description">${item.description == null ? '' : item.description}</p>
				<div class="news-footer">
					<time class="news-datetime" datetime="${item.publishedAt}">
						<span class="news-date">${item.publishedAt}</span> 11:06
					</time>
					<div class="news-author">${item.author == null ? '' : item.author}</div>
				</div>		
		`
		newsList.append(card)
	});
}

const loadNews = async () => {
	const data = await getdata('https://newsapi.org/v2/top-headlines?country=ru')
	renderCart(data.articles)
}
loadNews()
