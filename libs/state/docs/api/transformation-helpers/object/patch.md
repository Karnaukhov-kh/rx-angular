

# patch

Merges an object of type T with updates of type Partial<T>.

*Example*

```TypeScript
interface Creature {
```


## Signature

```TypeScript
function patch<T extends object>(object: T, upd: Partial<T>): T
```
## Parameters

### object
 ##### typeof: T

### upd
 ##### typeof: Partial&#60;T&#62;
