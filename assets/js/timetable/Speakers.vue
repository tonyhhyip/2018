<template functional>
    <div class="speakers">
        <div v-for="(speaker, index) in props.speakers" :key="index" class="speaker">
            <i class="material-icons">person</i>
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
