var evt = require( '../index' );
var closest = require( 'component-closest' );
var query = require( 'dom-query' );

// register an event lifecycle hooks similar to
// the jQuery special event interface, but without jquery
evt.register( 'click', {
  // to be executed the very first time an element has a listener of the provided type
  setup: function ( descriptor ) {
    console.log( '>>> click >>>', this, descriptor );
  },
  // to be executed each time a listener is added to the element
  // descriptor.callback is the original function to be passed to addEventListener
  add: function ( descriptor ) {
    // this is just a demo of the kind of things that can be done
    // with the events lifecycle. In this particular case
    // we disable the click event if the event happened inside
    // a disabled element
    var oldHandler = descriptor.callback;

    descriptor.callback = function ( e ) {
      // if any parent is disabled, then this event should not be fired
      if ( closest( e.target, '[disabled]' ) ) {
        return;
      }
      // call the original handler!
      oldHandler && oldHandler.apply( this, arguments );
    };

  }
} );

// a function to pass to addEventListener for a click
var fn = function ( e ) {
  console.log( 'click >>> ' + e.type, this );
};

// add event
// - can use namespaces
// - can use delegation
evt.on( query( '.box' ), 'click.some', '.button, button', fn );

evt.on( query( '#btn-remove' ), 'click', function () {
  // remove an event
  // - can remove events given a namespace only
  //   evt.off( query('.box'), '.some' )
  // - can remove an event providing the original function
  //   to be passed as a listener
  evt.off( query( '.box' ), 'click', fn );
} );

evt.on( query( '#btn-fire' ), 'click', function () {
  // can fire an event on any given
  // dom node
  evt.fire( query( '#btn-1' ), 'click' );
} );
