# Temporary Freeze (apply to toggle)
```js
"bindings": [
                                    {
                                        "binding_type": "view",
                                        "source_property_name": "(#iceff + (#iceff > -1) * #toggle_state)",
                                        "target_property_name": "#iceff"
                                    },
                                    {
                                        "binding_type": "view",
                                        "source_property_name": "(#toggle_state and not #toggle_state)",
                                        "target_property_name": "#toggle_state"
                                    }
                                ]
```

# Crash (also for toggle)
```js
 {
                                        "binding_type": "view",
                                        "source_property_name": "(#c + (#c > #c - 1) * #toggle_state)",
                                        "target_property_name": "#c"
                                    }
```

Other methods, just pass an invalid data to size/offset bindings.