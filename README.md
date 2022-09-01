# Usage

In a plain web page:

```html
<script type="module">
  import { interceptConsole } from './dist/ulak.js';
  interceptConsole();
</script>
```

In a project where a bundler is present:

add `ulak` to `package.json`

```json
{
  "dependencies": {
    "ulak": "x.y.z"
  }
}
```
then:
```javascript
import { interceptConsole } from 'ulak';

interceptConsole();
```

In both cases you need the following HTML tag in your page:

`<bug-report-button text="Hata Bildir"></bug-report-button>`
