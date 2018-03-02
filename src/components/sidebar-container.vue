<template>
    <div>
        <sidebar :sidebars="sidebars"></sidebar>
        <container></container>
    </div>
</template>
 
<script>

import sidebar from './sidebar';
import container from './container';

export default {
    name: 'sidebar-container',
    props: ['sidebars'],
    components: {sidebar, container}
}
</script>