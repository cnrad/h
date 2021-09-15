# h.cnrad.dev

[Example below](https://h.cnrad.dev/?title=Cool%20New%20Tab&pinned=https://raw.githubusercontent.com/cnrad/h.cnrad.dev/master/src/bookmarks.json&background=https://images.unsplash.com/photo-1418513110185-f0ec221e47b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80)
![image](https://user-images.githubusercontent.com/83192247/133363590-ad8f619c-f3a1-4b53-bf46-eed7be94a6d1.png)

## Features

### Weather Widget
Fetches your local current weather by IP address

### Time Widget
Displays the current day and time

### Custom Title
Set your own title by using the `title=:string` query parameter. 

### Custom Background
Set your own background using the `background=:link` query parameter. You can use a random image API as well, such as Unsplash, where you can specify parameters or keywords: `https://source.unsplash.com/random/1920x1080?sunset,night`

### Pinned Sites
Link your own pinned sites by putting a link to a raw JSON file in the `pinned=:link` query parameter
JSON must be an array with the following properties:
```json
[
    {
      "name": "placeholder",
      "url": "https://github.com/cnrad",
      "image": "https://www.sferalabs.cc/wp-content/uploads/github-logo-white.png"
    }
]
```

## Etc
If you have any ideas for features or want to contribute, feel free to hit me up or create a pull request yourself!

Also, drop a ⭐ if you use this or think this project is cool, it means a lot. 🙂

