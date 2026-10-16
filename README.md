# Products CRUD API

Express-ზე აწყობილი მარტივი CRUD API პროდუქტებისთვის. მონაცემები ინახება `products.json` ფაილში.

## ინსტალაცია

```bash
npm install
```

## გაშვება

```bash
npm run dev   # nodemon-ით (ავტომატური გადატვირთვა)
npm start     # ჩვეულებრივი node-ით
```

სერვერი გაეშვება მისამართზე: `http://localhost:3000`

## პროდუქტის სტრუქტურა

```json
{
  "id": 1,
  "name": "iPhone 15",
  "price": 2999,
  "description": "Apple smartphone"
}
```

`name` და `price` სავალდებულოა პროდუქტის შექმნისას. `id` ავტომატურად ენიჭება.

## Endpoints

| მეთოდი | მისამართი       | აღწერა                          |
| ------ | --------------- | ------------------------------- |
| POST   | `/products`     | ახალი პროდუქტის შექმნა          |
| GET    | `/products`     | ყველა პროდუქტის მიღება          |
| GET    | `/products/:id` | პროდუქტის მიღება id-ით          |
| PUT    | `/products/:id` | პროდუქტის განახლება             |
| DELETE | `/products/:id` | პროდუქტის წაშლა                 |

## მაგალითები

**შექმნა**

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "iPhone 15", "price": 2999, "description": "Apple smartphone"}'
```

**ყველას მიღება**

```bash
curl http://localhost:3000/products
```

**id-ით მიღება**

```bash
curl http://localhost:3000/products/1
```

**განახლება**

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 2499}'
```

**წაშლა**

```bash
curl -X DELETE http://localhost:3000/products/1
```

## პასუხის კოდები

- `200` — წარმატებული ოპერაცია
- `201` — პროდუქტი შეიქმნა
- `400` — აკლია სავალდებულო ველები (`name`, `price`)
- `404` — პროდუქტი ვერ მოიძებნა
