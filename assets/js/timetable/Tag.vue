<template functional>
    <div class="tags">
        <div class="tag">
            <template v-if="props.tags && props.tags.length > 0">
            <i class="material-icons">local_offer</i>
            <span>{{ props.tags.join(', ') }}</span>
            </template>
        </div>
        <!--<span><i class="material-icons">event</i></span>-->
    </div>
</template>
