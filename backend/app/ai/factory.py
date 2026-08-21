from app.core.config import settings
from app.ai.base import VisionProvider, SpeechProvider, ReasoningProvider
from app.ai.mock_provider import MockVisionProvider, MockSpeechProvider, MockReasoningProvider
from app.ai.gemini_provider import GeminiVisionProvider, GeminiSpeechProvider, GeminiReasoningProvider

def get_vision_provider() -> VisionProvider:
    if settings.AI_PROVIDER == "gemini":
        return GeminiVisionProvider()
    return MockVisionProvider()

def get_speech_provider() -> SpeechProvider:
    if settings.AI_PROVIDER == "gemini":
        return GeminiSpeechProvider()
    return MockSpeechProvider()

def get_reasoning_provider() -> ReasoningProvider:
    if settings.AI_PROVIDER == "gemini":
        return GeminiReasoningProvider()
    return MockReasoningProvider()
