import React, { useState } from 'react';
import { Card, Checkbox, Popover, Stack, Tag, TextField } from '@shopify/polaris';
import styles from './skills.module.scss';
import { SkillDTO } from '../../dto/UpdateMyProfileDTO';

const mockSkills = [{ name: 'Education' }, { name: 'Swimming' }, { name: 'Running' }];

interface ISkills {
  skills: SkillDTO[];
  selectedSkills: SkillDTO[];
  onSkillRemove: (skill: SkillDTO) => void;
  onSkillAdd: (skill: SkillDTO, checked: boolean) => void;
}

export const SkillsPopover: React.FC<ISkills> = ({
  skills,
  selectedSkills,
  onSkillRemove,
  onSkillAdd,
}: ISkills) => {
  const [skillSearch, setSkillSearch] = useState('');
  const [skillsPopoverActive, setSkillsPopoverActive] = useState(false);

  const skillsPopoverActivator = (
    <TextField
      label=""
      value={skillSearch}
      onChange={(value) => setSkillSearch(value)}
      placeholder="Choose your main skills"
      onFocus={() => setSkillsPopoverActive(true)}
    />
  );

  const handleAddSkill = (skill: SkillDTO) => (checked: boolean) => {
    setSkillSearch('');
    setSkillsPopoverActive(false);
    onSkillAdd(skill, checked);
  };

  const handleSkillRemove = (skill: SkillDTO) => () => {
    onSkillRemove(skill);
  };

  return (
    <>
      <Popover
        active={skillsPopoverActive}
        activator={skillsPopoverActivator}
        onClose={() => setSkillsPopoverActive(false)}
        fullWidth
      >
        <Card>
          <Card.Section>
            <div className={styles.skillsPopoverContainer}>
              {skills
                .filter((skill) => {
                  if (skillSearch === '') {
                    return true;
                  }
                  return skill.name.includes(skillSearch);
                })
                .map((skill) => (
                  <div key={skill.id}>
                    <Checkbox
                      checked={
                        selectedSkills.filter((selectedSkill) => selectedSkill.name === skill.name)
                          .length > 0
                      }
                      onChange={handleAddSkill(skill)}
                      label={skill.name}
                    />
                  </div>
                ))}
            </div>
          </Card.Section>
        </Card>
      </Popover>
      {selectedSkills.length > 0 && (
        <div className={styles.selectedSkillsContainer}>
          <Stack>
            {selectedSkills.map((skill) => (
              <Tag key={skill.id} onRemove={handleSkillRemove(skill)}>
                {skill.name}
              </Tag>
            ))}
          </Stack>
        </div>
      )}
    </>
  );
};
