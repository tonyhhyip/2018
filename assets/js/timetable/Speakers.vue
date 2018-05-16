<template functional>
    <div v-if="props.speakers.length > 0" class="speakers">
        <div v-for="(speaker, index) in props.speakers" :key="index" class="speaker">
            <div class="thumbnail">
                <i v-if="!speaker.thumbnail" class="material-icons">account_circle</i>
                <img v-if="speaker.thumbnail" :src="speaker.thumbnail" :alt="speaker.name" :title="speaker.name" />
            </div>
            <div class="person">
                <span class="name">{{ speaker.name }}</span>
                <span class="title">
                    <template v-if="speaker.community">
                        {{ speaker.community }} / {{ " " }}
                    </template>
                    {{ speaker.country }}
                </span>
            </div>
        </div>
    </div>
</template>
