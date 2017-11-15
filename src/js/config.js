require.config({
    paths:{
        jquery:'../lib/jquery-3.2.1',
        csmCarousel:'../lib/jquery-csmCarousel/jquery-csmCarousel',
        common:'common'
    },
    shim:{
       common:['jquery'],
       csmCarousel:['jquery']
    }

});