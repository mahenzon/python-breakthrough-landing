<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold mb-4 text-center">{{ $t('courseLinks.title') }}</h2>
        <p class="text-center text-gray-600 mb-12 text-lg">{{ $t('courseLinks.description') }}</p>

        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">🎓</span>
              <h3 class="text-2xl font-bold text-primary-600">{{ $t('courseLinks.mainSite') }}</h3>
            </div>
            <p class="text-lg font-medium mb-3">{{ $t('courseLinks.mainSiteTitle') }}</p>
            <p class="text-gray-700 mb-4">{{ $t('courseLinks.mainSiteDescription') }}</p>
            <a
              href="https://learn.mahenzon.ru/public/product/2f21dd78-666e-4806-9046-818353d6fc1b/tariffs"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block w-full text-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg mb-4"
            >
              {{ $t('courseLinks.goToCourse') }} →
            </a>
            <div class="bg-gray-50 p-4 rounded">
              <p class="text-sm text-gray-600">💡 {{ $t('courseLinks.mainSiteNote') }}</p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">📚</span>
              <h3 class="text-2xl font-bold text-primary-600">{{ $t('courseLinks.stepikSite') }}</h3>
            </div>
            <p class="text-lg font-medium mb-3">{{ $t('courseLinks.stepikTitle') }}</p>
            <p class="text-gray-700 mb-4">{{ $t('courseLinks.stepikDescription') }}</p>
            <a
              href="https://stepik.org/a/232803/pay?promo=4038a0310be870d3"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block w-full text-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg mb-4"
            >
              {{ $t('courseLinks.goToCourse') }} →
            </a>
            <div class="bg-gray-50 p-4 rounded">
              <p class="text-sm text-gray-600">ℹ️ {{ $t('courseLinks.stepikNote') }}</p>
            </div>
          </div>
        </div>

        <div class="mb-16">
          <h3 class="text-3xl font-bold mb-12 text-center">{{ $t('courseLinks.valueTitle') }}</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div class="text-4xl mb-4">👨‍🏫</div>
              <h4 class="font-bold text-xl mb-3 text-primary-600">{{ $t('courseLinks.value1Title') }}</h4>
              <p class="text-gray-700">{{ $t('courseLinks.value1Description') }}</p>
            </div>
            <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div class="text-4xl mb-4">💼</div>
              <h4 class="font-bold text-xl mb-3 text-primary-600">{{ $t('courseLinks.value2Title') }}</h4>
              <p class="text-gray-700">{{ $t('courseLinks.value2Description') }}</p>
            </div>
            <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div class="text-4xl mb-4">🚀</div>
              <h4 class="font-bold text-xl mb-3 text-primary-600">{{ $t('courseLinks.value3Title') }}</h4>
              <p class="text-gray-700">{{ $t('courseLinks.value3Description') }}</p>
            </div>
            <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div class="text-4xl mb-4">⚡</div>
              <h4 class="font-bold text-xl mb-3 text-primary-600">{{ $t('courseLinks.value4Title') }}</h4>
              <p class="text-gray-700">{{ $t('courseLinks.value4Description') }}</p>
            </div>
            <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
              <div class="text-4xl mb-4">🌍</div>
              <h4 class="font-bold text-xl mb-3 text-primary-600">{{ $t('courseLinks.value5Title') }}</h4>
              <p class="text-gray-700">{{ $t('courseLinks.value5Description') }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-primary-50 to-white rounded-lg shadow-lg p-12 text-center">
          <div class="text-5xl mb-4">🏢</div>
          <h3 class="text-3xl font-bold mb-6">{{ $t('courseLinks.invoiceTitle') }}</h3>
          <p class="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">{{ $t('courseLinks.invoiceDescription') }}</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/contacts" class="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold text-lg">
              {{ $t('courseLinks.contactsTitle') }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
