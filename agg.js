/*
Загрузка данных и подключение к mongo
*/

/usr/bin/mongoimport --host $APP_MONGO_HOST --port $APP_MONGO_PORT --db movies --collection tags --file $NETOLOGY_DATA/raw_data/simple_tags.json
/usr/bin/mongo
use movies

/*
Запрос общего числа тегов
*/

db.tags.aggregate([{$group: {_id: "$status", tag_count: { $sum: 1 }}}])

print("tags count: ", 'расчёт количества тегов');

/*
Количество фильмов с тегом women
*/

db.tags.aggregate([{$match: {name: "women"}},{$group: {_id: "$status", tag_count: { $sum: 1 }}}])

print("woman tags count: ", 'расчёт количества тегов woman');

/*
Топ-3 популярных тега
*/

db.tags.aggregate([
	{"$group" : 
		{_id:{name:"$name"}, count:{$sum:1}}
	}, 
	{$sort:{"count":-1}},
	{ $limit: 3 }
])

printjson(
        db.tags.aggregate([
                {"$group": {
                                "--": "--",
                                "--": "--"
                           }
                },
                {"тут модификатор sort по полю с аггрегацией"},
                {$limit: 3}
        ])['_batch']
);