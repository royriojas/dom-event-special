var evt = require( '../index' );
var closest = require( 'closest' );
var query = require( 'dom-query' );

evt.register( 'click', {
  setup: function ( descriptor ) {
    console.log( '>>> click >>>', this, descriptor );
  },
  add: function ( descriptor ) {
    var oldHandler = descriptor.callback;

    descriptor.callback = function ( e ) {
      if ( closest( e.target, '[disabled]', true ) ) {
        return;
      }

      oldHandler && oldHandler.apply( this, arguments );
    };

  }
} );

var fn = function ( e ) {
  console.log( 'click >>> ' + e.type, this );
};

evt.on( query( '.box' ), 'click.some', '.button, button', fn );

evt.on( query( '#btn-remove' ), 'click', function () {
  evt.off( query( '.box' ), 'click', fn );
} );

evt.on( query( '#btn-fire' ), 'click', function () {
  evt.fire( query( '#btn-1' ), 'click' );
} );
