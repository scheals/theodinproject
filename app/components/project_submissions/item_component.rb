module ProjectSubmissions
  class ItemComponent < ApplicationComponent
    with_collection_parameter :project_submission
    renders_one :title, ProjectSubmissions::TitleComponent

    def initialize(project_submission:)
      @project_submission = project_submission
    end

    def render?
      project_submission.present?
    end

    private

    attr_reader :project_submission
  end
end
