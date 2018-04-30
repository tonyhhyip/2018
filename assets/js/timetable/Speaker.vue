<template functional>
    <div class="speakers">
        <div class="speaker">
            <i class="material-icons">person</i>
            <div class="person">
                <span class="name">{{ props.speaker.name }}</span>
                <span class="title">
                    <template v-if="props.speaker.community">
                        {{ props.speaker.community }} / {{ " " }}
                    </template>
                    {{ props.speaker.country }}
                </span>
            </div>
        </div>
    </div>
</template>
