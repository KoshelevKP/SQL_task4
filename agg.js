/*
�������� ������ � ����������� � mongo
*/

/usr/bin/mongoimport --host $APP_MONGO_HOST --port $APP_MONGO_PORT --db movies --collection tags --file $NETOLOGY_DATA/raw_data/simple_tags.json
/usr/bin/mongo
use movies

/*
������ ������ ����� �����
*/

db.tags.aggregate([{$group: {_id: "$status", tag_count: { $sum: 1 }}}])

print("tags count: ", '������ ���������� �����');

/*
���������� ������� � ����� women
*/

db.tags.aggregate([{$match: {name: "women"}},{$group: {_id: "$status", tag_count: { $sum: 1 }}}])

print("woman tags count: ", '������ ���������� ����� woman');

/*
���-3 ���������� ����
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
                {"��� ����������� sort �� ���� � �����������"},
                {$limit: 3}
        ])['_batch']
);