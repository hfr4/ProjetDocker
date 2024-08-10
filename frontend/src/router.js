import { createRouter, createWebHistory } from 'vue-router'

import Artists    from './components/Artists.vue'
import Albums     from './components/Albums.vue'
import Tracks     from './components/Tracks.vue'
import Genres     from './components/Genres.vue'
import Genre      from './components/Genre.vue'
import GenreEdit  from './components/GenreEdit.vue'
import Artist     from './components/Artist.vue'
import ArtistEdit from './components/ArtistEdit.vue'
import Album      from './components/Album.vue'
import AlbumEdit  from './components/AlbumEdit.vue'
import AlbumNew   from './components/AlbumNew.vue'
import TrackNew   from './components/TrackNew.vue'
import Login      from './components/Login.vue'
import Register   from './components/Register.vue'
import Profile    from './components/Profile.vue'
import NotFound   from './components/NotFound.vue'

const routes = [
    { path: '/'                     , component : Artists    },
    { path: '/artists'              , component : Artists    },
    { path: '/albums'               , component : Albums     },
    { path: '/tracks'               , component : Tracks     },
    { path: '/genres'               , component : Genres     },
    { path: '/login'                , component : Login      },
    { path: '/register'             , component : Register   },
    { path: '/profile'              , component : Profile    },
    { path: '/genres/:id'           , component : Genre      },
    { path: '/genres/:id/edit'      , component : GenreEdit  },
    { path: '/albums/:id'           , component : Album      },
    { path: '/albums/:id/edit'      , component : AlbumEdit  },
    { path: '/albums/:id/tracks/new', component : TrackNew   },
    { path: '/albums/new'           , component : AlbumNew   },
    { path: '/artists/:id'          , component : Artist     },
    { path: '/artists/:id/edit'     , component : ArtistEdit },
    { path: '/:pathMatch(.*)*'      , component : NotFound   },
]

export const router = createRouter({
  history : createWebHistory(),
  routes  : routes,
})
