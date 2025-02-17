# Injecting

## by a browser extension

The directory `ext-fetch` contains an attempt at a browser extension based injection. 

### Obstacles

The *content scripts* are executed in a different context. 
The *window* object gets destroyed when the script ends. 
The loaded page gets a different *window* object.
This *window* object is not directly accessible to the *content scripts*. 
However, the *document* object is the one from the loaded page. 
Scripts added to that *document* object are executed within the page context.

### Service worker versus background.scripts

As of January 2025, Firefox and Chromium are not implementing the same manifest template.  

## for Chromium based browsers

*DevTools* for Chromium allows a local override. It does was this project was intended to do.
In the Network pane, one can select a request-response pair and select override from the right click menu.
It stores the overridden content, or the added headers in files - path resembles the url. 
When a new request is made, the modified content is delivered instead.