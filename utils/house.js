const axios = require('axios');
const issue = require('./issue.js');
const time = require('./time');

function getData() {
	const url = 'http://api.huiyuejiagongyu.com/api/v1/shop/index.aspx';
	console.log(url);

	const para = {
		id: 2,
		method: 'house_roomslist',
		params: {
			orientation: '',
			housesId: 45,
			habitable: '',
			area: '',
			rentmoney: '',
			unitId: 18,
		},
	};
	axios.post(url, para).then((res) => {
		// const top10Objs = res.data.hits.slice(0, 10);
		// formateData(top10Objs);
		// console.log(JSON.stringify(res.data))
		if (res.data != null) {
		  const data = res.data.result.data.floorList;
		  const title = `House ${time.getTitleHour()}`;
		  let content = '';

		  for (const i in data) {
		  	const floor = data[i];
		  	const rooms = floor.roomList;
		  	for (const j in rooms) {
		  		const room = rooms[j];
		  		if (room.status != 5) {
		  			content += `${room.roomNo}, ${room.status} \n`;
		  			console.log(para);
		  		}
		  	}
		  }
			issue.post(content, title, 'house');
		}
	}).catch((error) => {
		console.log(error);
	});
}

getData();
